"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/terminal/Table";
import { Button } from "@/components/terminal/Button";
import type { Contract } from "@/components/ingest/contract-types";

interface ContractTableProps {
  contracts: Contract[];
  onDelete: (id: string) => void;
}

export function ContractTable({ contracts, onDelete }: ContractTableProps) {
  const router = useRouter();

  const handleRowClick = (id: string) => {
    router.push(`/contracts/${id}`);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Contract ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Events</TableHead>
          <TableHead>Tags</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {contracts.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center text-terminal-gray py-8">
              No contracts registered. Click &quot;Register Contract&quot; to add one.
            </TableCell>
          </TableRow>
        ) : (
          contracts.map((contract) => (
            <TableRow
              key={contract.id}
              onClick={() => handleRowClick(contract.id)}
              className="cursor-pointer"
            >
              <TableCell className="font-mono text-terminal-cyan">
                {contract.contractId.slice(0, 8)}...
              </TableCell>
              <TableCell className="font-semibold">{contract.name}</TableCell>
              <TableCell>
                <span
                  className={`inline-flex items-center gap-2 px-2 py-1 text-xs font-mono ${
                    contract.status === "active"
                      ? "text-terminal-green border border-terminal-green/30 bg-terminal-green/10"
                      : "text-terminal-gray border border-terminal-gray/30 bg-terminal-gray/10"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      contract.status === "active"
                        ? "bg-terminal-green animate-pulse"
                        : "bg-terminal-gray"
                    }`}
                  />
                  {contract.status.toUpperCase()}
                </span>
              </TableCell>
              <TableCell className="font-mono">{contract.eventCount.toLocaleString()}</TableCell>
              <TableCell>
                <div className="flex gap-1 flex-wrap">
                  {contract.tags?.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 bg-terminal-cyan/10 text-terminal-cyan border border-terminal-cyan/30"
                    >
                      {tag}
                    </span>
                  ))}
                  {(contract.tags?.length ?? 0) > 3 && (
                    <span className="text-xs text-terminal-gray">
                      +{(contract.tags?.length ?? 0) - 3}
                    </span>
                  )}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="danger"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(contract.id);
                  }}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
