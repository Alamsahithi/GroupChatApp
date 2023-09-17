document
  .getElementById("signupForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const user = {};

    for (let [key, value] of formData.entries()) {
      user[key] = value;
    }

    fetch(
      "C:/sahithi/GroupChatApp/signup.html",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 409) {
          throw new Error("Email already exists");
        } else {
          throw new Error("Failed to submit user details");
        }
      })
      .then((data) => {
        console.log(data); // Handle response data
        form.reset(); // Clear form input values
        alert("User details submitted successfully!");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert(error.message);
      });
  });
