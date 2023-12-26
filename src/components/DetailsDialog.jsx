import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  DialogContent,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Fragment } from "react";
import PropTypes from "prop-types";
import { formatUserName } from "../utils/funcs";

const DetailsDialog = (props) => {
  const { isOpen, onClose, photo } = props;

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={isOpen}
        onClose={onClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent>
          <Card elevation={0}>
            <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button onClick={onClose} size="small">
                close
              </Button>
            </CardActions>
            <CardMedia
              component="img"
              alt={photo?.alt_description}
              image={photo?.urls?.regular}
            />
            <CardContent>
              {photo?.description && (
                <Typography variant="body2" color="text.secondary">
                  {photo?.description}
                </Typography>
              )}
              <Stack direction="row" justifyContent="space-between">
                <Stack justifyContent="center">
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                    sx={{ fontWeight: 700 }}
                  >
                    Owner
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                    sx={{ fontWeight: 400 }}
                  >
                    {formatUserName(photo)}
                  </Typography>
                </Stack>
                <Stack>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                    sx={{ fontWeight: 700 }}
                  >
                    Likes
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                    sx={{ fontWeight: 400 }}
                  >
                    {photo?.likes || 0}
                  </Typography>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

DetailsDialog.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  photo: PropTypes.object,
};

export default DetailsDialog;
