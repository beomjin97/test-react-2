import { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { useOrderDetails } from "../../contexts/OrderDetails";
import AlertBanner from "../common/AlertBanner";

export default function OrderConfirmation({ setOrderPhase }) {
  const { resetOrder } = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .post("http://localhost:3030/order")
      .then((res) => {
        console.log(res.data.orderNumber);
        setOrderNumber(res.data.orderNumber);
      })
      .catch((err) => {
        setError(true);
      });
  }, []);

  function handleClick() {
    resetOrder();
    setOrderPhase("inProgress");
  }

  const newOrderButton = (
    <Button onClick={handleClick}>Create new order</Button>
  );

  if (error) {
    return (
      <>
        <AlertBanner message={null} variant={null} />
        {newOrderButton}
      </>
    );
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
      {newOrderButton}
    </div>
  );
}
