document.addEventListener("DOMContentLoaded", () => {
    const chartTab = document.querySelector("#chart-tab");
    const ctx = document.getElementById("myChart").getContext("2d");

    let myChart;

    // Add event listener for username input validation
    const usernameInput = document.getElementById("username");
    usernameInput.addEventListener("input", () => {
        const username = usernameInput.value;
        const regex = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{8,}$/; // Regex for validation
        if (regex.test(username)) {
            usernameInput.style.borderColor = "green"; // Valid username
        } else {
            usernameInput.style.borderColor = "red"; // Invalid username
        }
    });

    chartTab.addEventListener("click", () => {
        const incomeData = [];
        const expensesData = [];
        const months = [
            "january", "february", "march", "april", "may", "june",
            "july", "august", "september", "october", "november", "december"
        ];

        // Collect data from input fields
        months.forEach((month) => {
            const incomeInput = document.querySelector(`#${month}-income`);
            const expensesInput = document.querySelector(`#${month}-expenses`);

            incomeData.push(Number(incomeInput?.value) || 0);
            expensesData.push(Number(expensesInput?.value) || 0);
        });

        console.log("Income Data:", incomeData);
        console.log("Expenses Data:", expensesData);

        // Destroy the previous chart instance if it exists
        if (myChart) {
            myChart.destroy();
        }

        // Create a new chart
        myChart = new Chart(ctx, {
            type: "bar",
            data: {
                labels: months.map(month => month.charAt(0).toUpperCase() + month.slice(1)),
                datasets: [
                    {
                        label: "Income",
                        data: incomeData,
                        backgroundColor: "rgba(75, 192, 192, 0.2)",
                        borderColor: "rgba(75, 192, 192, 1)",
                        borderWidth: 1,
                    },
                    {
                        label: "Expenses",
                        data: expensesData,
                        backgroundColor: "rgba(255, 99, 132, 0.2)",
                        borderColor: "rgba(255, 99, 132, 1)",
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: "top",
                    },
                    title: {
                        display: true,
                        text: "Monthly Income vs Expenses",
                    },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });
    });

    document.getElementById("download").addEventListener("click", () => {
        const canvas = document.getElementById("myChart"); // Replace "myChart" with your canvas ID
        const image = canvas.toDataURL("image/png"); // Convert canvas to a data URL

        const link = document.createElement("a"); // Create a temporary link element
        link.href = image; // Set the href to the data URL
        link.download = "chart.png"; // Set the download attribute with the desired file name
        link.click(); // Programmatically click the link to trigger the download
    });
});