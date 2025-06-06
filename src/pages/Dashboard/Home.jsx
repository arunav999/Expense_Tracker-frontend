import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { IoMdCard } from "react-icons/io";

import InfoCard from "../../components/Cards/InfoCard";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import ExpenseTransactions from "../../components/Dashboard/ExpenseTransactions";
import Last30DaysExpenses from "../../components/Dashboard/Last30DaysExpenses";

import { useUserAuth } from "../../hooks/useUserAuth";

import { addThousandsSeparator } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import RecentTransactions from "../../components/Dashboard/RecentTransactions";
import FinanceOverview from "../../components/Dashboard/FinanceOverview";
import RecentIncomeWithChart from "../../components/Dashboard/RecentIncomeWithChart";
import RecentIncome from "../../components/Dashboard/RecentIncome";

export default function Home() {
  useUserAuth();

  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.DASHBOARD.GET_DATA}`
      );

      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.error("Something went wrong. Please try again.", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();

    return () => {};
  }, []);

  const expenseCheck =
    dashboardData?.last30DaysExpenses?.transactions &&
    Array.isArray(dashboardData.last30DaysExpenses.transactions);

  const recentIncome =
    dashboardData?.last60DaysIncome?.transactions &&
    Array.isArray(dashboardData?.last60DaysIncome?.transactions);

  // console.log(dashboardData);

  return (
    <>
      <DashboardLayout activeMenu="Dashboard">
        <div className="my-5 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InfoCard
              icon={<IoMdCard />}
              label="Total Balance"
              value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
              color="bg-primary"
            />

            <InfoCard
              icon={<LuWalletMinimal />}
              label="Total Income"
              value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
              color="bg-orange-500"
            />

            <InfoCard
              icon={<LuHandCoins />}
              label="Total Expense"
              value={addThousandsSeparator(dashboardData?.totalExpenses || 0)}
              color="bg-red-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <RecentTransactions
              transactions={dashboardData?.recentTransactions}
              onSeeMore={() => navigate("/expense")}
            />

            <FinanceOverview
              totalBalance={dashboardData?.totalBalance || 0}
              totalIncome={dashboardData?.totalIncome || 0}
              totalExpense={dashboardData?.totalExpenses || 0}
            />

            {expenseCheck && (
              <ExpenseTransactions
                transactions={dashboardData.last30DaysExpenses.transactions}
                onSeeMore={() => navigate("/expense")}
              />
            )}

            {expenseCheck && (
              <Last30DaysExpenses
                data={dashboardData?.last30DaysExpenses?.transactions || {}}
              />
            )}

            {recentIncome && (
              <RecentIncomeWithChart
                data={
                  dashboardData?.last60DaysIncome?.transactions?.slice(0, 4) ||
                  []
                }
                totalIncome={dashboardData?.totalIncome || 0}
              />
            )}

            {recentIncome && (
              <RecentIncome
                transactions={
                  dashboardData?.last60DaysIncome?.transactions || []
                }
                onSeeMore={() => navigate("/income")}
              />
            )}
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}
