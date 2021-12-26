import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

interface ButtonPanelProps {
  link: string;
  image: string;
  text: string;
}

export function ButtonPanel({ link, image, text }: ButtonPanelProps) {
  return (
    <Grid item mx="auto">
      <Link to={link}>
        <Card
          sx={{
            minWidth: 250,
            maxWidth: 250,
            minHeight: 242,
            transition: '.2s',
            '&:hover': {
              transform: 'translateY(-5px)',
            },
            boxShadow: '5px 8px 8px -1px rgb(0 0 0 / 15%)',
          }}
        >
          <CardMedia
            component="img"
            height="150"
            image={image}
            alt={text}
            title={text}
          />
          <CardContent>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ textAlign: 'center' }}
            >
              {text}
            </Typography>
          </CardContent>
        </Card>
      </Link>
    </Grid>
  );
}
