import React from "react";
import { Button, Spinner } from "react-bootstrap";

const Checkout = ({ onClick, disabled, loading }) => {
  return (
    <Button
      id="check"
      style={{
        width: "100%",
        maxWidth: "580px",
        height: "80px",
        borderRadius: "50px",
        background: "#FD9564",
        border: "none",
        fontSize: "22px",
        fontWeight: "500",
        marginLeft: "45px",
      }}
      onClick={onClick}
      disabled={disabled}
    >
      {loading ? (
        <span>
          <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          Please wait...
        </span>
      ) : (
        "Checkout"
      )}
    </Button>
  );
};

export default Checkout;
