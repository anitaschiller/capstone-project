/* function customerForm(request, response) {
  response.send(`
  <h1>Please enter your details</h1>
  <form method='POST'>
    <label for='customername'> Name:
      <input type='text' name='customername'>
    </label>
    <label for='customeremail'> Email:
      <input type='text' name='customeremail'>
    </label>
    <button>Send</button>
  </form>
  `);
}

function postCustomer(request, response) {
  const { customername, customeremail } = request.body;
  response.send(`
  <h2>You entered the following details:</h2>
  <p>Name: ${customername}</p>
  <p>E-Mail: ${customeremail}</p>
  `);
}

export { customerForm, postCustomer };
 */
