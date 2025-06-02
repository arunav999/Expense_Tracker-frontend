import { useUserAuth } from "../../hooks/useUserAuth"

export default function Expense() {
  useUserAuth()
  
  return (
    <div>
      Expense
    </div>
  )
}
