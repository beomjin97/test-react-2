import { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { useOrderDetails } from "../../contexts/OrderDetails";

export default function OrderConfirmation({ setOrderPhase }) {
  const { resetOrder } = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState(null);

  useEffect(() => {
    axios
      .post("http://localhost:3030/order")
      .then((res) => {
        console.log(res.data.orderNumber);
        setOrderNumber(res.data.orderNumber);
      })
      .catch((err) => {});
  }, []);

  function handleClick() {
    resetOrder();
    setOrderPhase("inProgress");
  }

  if (!orderNumber) {
    return <div>Loading</div>;
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Thank You</h1>
      <p>Your order number is {orderNumber}</p>
      <p style={{ fontSize: "25%" }}>
        as per our terms and conditions, nothing will happen now
      </p>
      <Button onClick={handleClick}> Create new order</Button>
    </div>
  );
}
