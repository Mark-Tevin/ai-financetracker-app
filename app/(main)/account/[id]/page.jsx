import { getAccountWithTransactions } from "@/actions/accounts";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import TransactionTable from "../_components/transaction-table";
import { BarLoader } from "react-spinners";

const AccountsPage = async ({ params }) => {
  const acccountData = await getAccountWithTransactions(params.id);

  if (!acccountData) {
    notFound();
  }


  const { transactions, ...account } = accountData;

  return (
    <div className="space-y-8 px-4 ">
      <div className="flex gap-4 items-end jb">
        <div>
          <h1 className="text-5xl sm:text-6xl font-bold gradient-title capitalise">
          {account.name}
          </h1>
          <p className="text-muted-foreground">
          {account.type.charAt(0) + account.type.slice(1).toLowerCase()} Account
          </p>
        </div>

        <div className="text-right pb-2">
          <div className="text-xl sm:text-2xl font-bold">
            ${parseFloat(account.balance).toFixed(2)}
          </div>
          <p className="text-sm text-muted-foreground">
            {account._count.transactions} Transactions 
          </p>
        </div>
      </div>
      

      {/* Chart Section */}
      {/* Transaction Table */}
      <Suspense 
        fallback={<BarLoader className="mt-4" width={{"100%"}} color="#9333ea"/>}
      >
        <TransactionTable transactions={transactions}/> 
      </Suspense>
    </div>
  );
};

export default AccountsPage;
