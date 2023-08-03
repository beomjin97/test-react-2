import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utilities";
import Options from "./Options";

import Button from "react-bootstrap/Button";

const OrderEntry = ({ setOrderPhase }) => {
  const { totals } = useOrderDetails();

  const orderDisabled = totals.scoops === 0;

  return (
    <div>
      <h1>Design your sundae!</h1>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {formatCurrency(totals.scoops + totals.toppings)}</h2>
      <Button onClick={() => setOrderPhase("review")} disabled={orderDisabled}>
        Order Sundae!
      </Button>
    </div>
  );
};

export default OrderEntry;
