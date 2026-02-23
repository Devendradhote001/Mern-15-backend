const successOrder = (name) => {
  return `
    <div>
      <h1>Order placed successfully</h1>
      <h1 style="color: blue">Name - ${name}</h1>
      <img
      width="200"
      src="https://images.unsplash.com/photo-1771514069115-f2d790f9ed0e?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      alt=""
    />
    </div>
    `;
};

module.exports = successOrder;
