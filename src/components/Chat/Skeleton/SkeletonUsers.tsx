import { Box, Skeleton } from '@mui/material';

export const SkeletonUsers = () => (
  <Box
    sx={{
      width: '100%',
      maxWidth: '100%',
      height: '90vh', // Высота чата с ограничением
      overflowY: 'auto', // Добавляем вертикальную прокрутку
      padding: 2,
      margin: '0 auto',
      backgroundColor: 'secondary',
    }}
  >
    <Skeleton height={70} animation="wave" />
    <Skeleton height={70} animation="wave" />
    <Skeleton height={70} animation="wave" />
    <Skeleton height={70} animation="wave" />
    <Skeleton height={70} animation="wave" />
    <Skeleton height={70} animation="wave" />
    <Skeleton height={70} animation="wave" />
    <Skeleton height={70} animation="wave" />
    <Skeleton height={70} animation="wave" />
  </Box>
);
