import { Divider, IconButton, Stack, Tooltip, Typography } from "@mui/material"
import type { CartItem } from "./api/products"
import { priceFormatter } from "../utils/price-formatter"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { addToCart, deleteFromCart, removeFromCart } from "./api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";


interface CartItemProps {
  item: CartItem
}

export const CartItemRow = ({ item }: CartItemProps) => {
  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: async () => addToCart(item.name, 1),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
  });
  const removeMutation = useMutation({
    mutationFn: async () => removeFromCart(item.name, 1),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
  });
  const deleteMutation = useMutation({
    mutationFn: async () => deleteFromCart(item.name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
  });


  return (
    <Stack>
      <Typography variant="h4">{item.name}</Typography>
      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" width={{ xs: '100%', md: '80%' }}>
        <Typography variant="h5" color="secondary">
          {`${item.amount} @ ${priceFormatter.format(item.price)} EA`}
        </Typography>
        <Typography variant="h5" color="secondary" textAlign="right">
          {`${priceFormatter.format(item.price * item.amount)}`}
        </Typography>
      </Stack>
      <Stack direction="row" mb={2}>
        <Tooltip title="Add 1">
          <IconButton
            color="success"
            edge="start"
            aria-label="add 1"
            onClick={() => addMutation.mutate()}
            loading={addMutation.isPending}
            sx={{ mr: 1 }}
          >
            <AddCircleOutlineIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Remove 1">
          <IconButton
            color="warning"
            edge="start"
            aria-label="remove 1"
            onClick={() => removeMutation.mutate()}
            loading={removeMutation.isPending}
            sx={{ mr: 1 }}
          >
            <RemoveCircleOutlineIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton
            color="error"
            edge="start"
            aria-label="delete"
            onClick={() => deleteMutation.mutate()}
            loading={deleteMutation.isPending}
            sx={{ mr: 1 }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Stack>
      <Divider variant="middle" sx={{ width: { xs: '100%', md: '80%' } }} />
    </Stack>
  );
}
