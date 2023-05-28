function resSuccess(res, code, message, data) {
  const isObject = (data) => {
    return !!data && data.constructor === Object;
  };
  const response = {
    status: "success",
    message: message,
    data: isObject(data) ? [data] : data,
  };
  res.status(code).json(response);
}

function resError(res, code, message) {
  const response = {
    status: "error",
    message: message,
  };
  res.status(code).json(response);
}

function resTransaction(rawData) {
  return rawData.reduce((acc, curr) => {
    const existingTransaction = acc.find((item) => item.id === curr.id);
    if (existingTransaction) {
      existingTransaction.items.push({
        id: curr.item_id,
        name: curr.item_name,
        price: curr.item_price,
        qty: curr.item_qty,
      });
    } else {
      acc.push({
        id: curr.id,
        code: curr.code,
        date: curr.date,
        is_paid: curr.is_paid,
        created_at: curr.created_at,
        items: [
          {
            id: curr.item_id,
            name: curr.item_name,
            price: curr.item_price,
            qty: curr.item_qty,
          },
        ],
      });
    }
    return acc;
  }, []).map((transaction) => {
    const total = transaction.items.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );
    return {
      ...transaction,
      total,
    };
  });
}


module.exports = {
  resSuccess,
  resError,
  resTransaction,
};
