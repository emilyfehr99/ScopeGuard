document.getElementById('scanBtn').addEventListener('click', () => {
    const resultDiv = document.getElementById('result');
    resultDiv.textContent = "Scanning...";

    // Placeholder for actual scanning logic
    setTimeout(() => {
        resultDiv.textContent = "No scope creep detected on this page.";
        resultDiv.style.color = "#10b981"; // emerald-500
    }, 1500);
});
