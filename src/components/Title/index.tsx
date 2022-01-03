import { Typography } from '@mui/material';

interface TitleProps {
  title: string;
}

export function Title({ title }: TitleProps) {
  return (
    <Typography
      variant="h4"
      // color="text.primary"
      sx={{
        fontWeight: 'bold',
        mt: 18,
        mb: 6,
        position: 'relative',
        '&::before': {
          content: '""',
          display: 'block',
          width: '20px',
          height: '20px',
          backgroundColor: '#35D32F',
          position: 'absolute',
          bottom: 3,
          left: -5,
          zIndex: -1,
          borderRadius: 1,
        },
      }}
    >
      {title}
    </Typography>
  );
}
