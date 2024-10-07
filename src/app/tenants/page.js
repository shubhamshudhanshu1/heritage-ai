"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
  Button,
} from "@mui/material";
import { fetchTenants } from "@/redux/slices/tenantSlice";
import { useRouter } from "next/navigation";

const Tenants = () => {
  const dispatch = useDispatch();
  const { tenants, loading, error } = useSelector((state) => state.tenants);
  const router = useRouter();
  useEffect(() => {
    dispatch(fetchTenants());
  }, [dispatch]);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Tenants</h1>
      <div className="flex flex-row justify-end my-2">
        <Button
          variant="outlined"
          onClick={() => {
            router.push("tenants/updateTenant");
          }}
        >
          Add Tenant
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tenants.map((tenant) => (
              <TableRow key={tenant._id}>
                <TableCell>{tenant.tenantId}</TableCell>
                <TableCell>{tenant.tenantName}</TableCell>
                <TableCell>{tenant.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Tenants;
