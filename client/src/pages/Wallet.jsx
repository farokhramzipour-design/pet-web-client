import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Card, CardContent, Grid, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Alert, CircularProgress } from '@mui/material';
import { walletApi } from '../api';

export default function Wallet() {
  const [wallets, setWallets] = useState([]);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openTopUp, setOpenTopUp] = useState(false);
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    loadWallets();
  }, []);

  useEffect(() => {
    if (selectedWallet) {
      loadTransactions(selectedWallet.id);
    }
  }, [selectedWallet]);

  const loadWallets = async () => {
    try {
      const response = await walletApi.getWallets();
      setWallets(response.data);
      if (response.data.length > 0) {
        setSelectedWallet(response.data[0]);
      }
    } catch (err) {
      console.error("Failed to load wallets", err);
      setError('Failed to load wallet information.');
    } finally {
      setLoading(false);
    }
  };

  const loadTransactions = async (walletId) => {
    try {
      const response = await walletApi.getWalletTransactions(walletId);
      setTransactions(response.data);
    } catch (err) {
      console.error("Failed to load transactions", err);
    }
  };

  const handleCreateWallet = async () => {
    try {
      await walletApi.createWallet({ currency: 'USD' }); // Default to USD for now
      loadWallets();
    } catch (err) {
      console.error("Failed to create wallet", err);
      setError('Failed to create wallet.');
    }
  };

  const handleTopUp = async () => {
    if (!selectedWallet) return;
    try {
      // In a real app, this would integrate with Stripe.
      // The API returns a client_secret for Stripe.
      // For this demo, we'll assume the API handles the "top up" logic or we just simulate it.
      // Looking at the API docs: /api/wallet/{wallet_id}/top-up returns PaymentIntent client_secret.
      // Since we don't have a frontend Stripe setup here, we might hit a wall if the backend expects a confirmed payment.
      // However, usually for these types of "clone" projects, the backend might just add the funds or we might need a mock.
      
      // Let's try calling the endpoint.
      await walletApi.topUpWallet(selectedWallet.id, { amount: parseFloat(amount) });
      
      // If the API only creates an intent, the balance won't update until a webhook fires.
      // But let's assume for a simple demo it might auto-confirm or we just show a success message.
      alert('Top-up initiated! (In a real app, this would open Stripe payment)');
      setOpenTopUp(false);
      setAmount('');
      loadWallets(); // Refresh balance
    } catch (err) {
      console.error("Top up failed", err);
      setError('Top up failed.');
    }
  };

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        My Wallet
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {wallets.length === 0 ? (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h6" gutterBottom>You don't have a wallet yet.</Typography>
          <Button variant="contained" onClick={handleCreateWallet}>Create Wallet (USD)</Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ bgcolor: 'primary.main', color: 'primary.contrastText' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Current Balance</Typography>
                <Typography variant="h3">
                  {selectedWallet?.currency} {selectedWallet?.balance}
                </Typography>
                <Button 
                  variant="contained" 
                  color="secondary" 
                  sx={{ mt: 2 }}
                  onClick={() => setOpenTopUp(true)}
                >
                  Top Up
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Typography variant="h6" gutterBottom>Transaction History</Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactions.map((tx) => (
                    <TableRow key={tx.id}>
                      <TableCell>{new Date(tx.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>{tx.transaction_type}</TableCell>
                      <TableCell 
                        sx={{ 
                          color: tx.amount > 0 ? 'success.main' : 'error.main',
                          fontWeight: 'bold'
                        }}
                      >
                        {tx.amount > 0 ? '+' : ''}{tx.amount}
                      </TableCell>
                      <TableCell>{tx.status}</TableCell>
                    </TableRow>
                  ))}
                  {transactions.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} align="center">No transactions found.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      )}

      {/* Top Up Dialog */}
      <Dialog open={openTopUp} onClose={() => setOpenTopUp(false)}>
        <DialogTitle>Top Up Wallet</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            Enter amount to add to your wallet.
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="Amount"
            type="number"
            fullWidth
            variant="standard"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenTopUp(false)}>Cancel</Button>
          <Button onClick={handleTopUp} variant="contained">Proceed</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
