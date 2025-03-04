document.addEventListener('DOMContentLoaded', (event) => {
    let interval; // Variable to store the interval ID
    let countdownStarted = false; // Flag to check if the countdown has started

    // Function to handle the flip animation of the countdown cards
    const flip = (top, bottom, newValue) => {
        const currentValue = top.innerText;

        if (currentValue === newValue) return; // If the value hasn't changed, do nothing

        top.innerText = newValue; // Update the top part with the new value
        bottom.innerText = newValue; // Update the bottom part with the new value

        top.parentElement.classList.remove('flip'); // Remove the flip class to reset the animation
        void top.parentElement.offsetWidth; // Trigger reflow to restart the animation
        top.parentElement.classList.add('flip'); // Add the flip class to start the animation
    };

    // Function to update the countdown clock
    const updateClock = () => {
        const dateInput = document.getElementById('countdown-date').value; // Get the date input value
        const timeInput = document.getElementById('countdown-time').value; // Get the time input value

        let countToDate; // Variable to store the target date and time

        if (dateInput) {
            if (timeInput) {
                countToDate = new Date(`${dateInput}T${timeInput}`); // Combine date and time if both are provided
            } else {
                countToDate = new Date(`${dateInput}T00:00:00`); // Default to midnight if no time is provided
            }
        } else {
            // Default to October 29th of the current year at midnight if no date or time is provided
            const currentYear = new Date().getFullYear();
            countToDate = new Date(`${currentYear}-10-29T00:00:00`);
        }

        // Check if the target date is valid
        if (isNaN(countToDate.getTime())) {
            clearInterval(interval); // Clear the interval if the date is invalid
            document.getElementById('countdown-display').innerHTML = 'Invalid date or time input'; // Display error message
            return;
        }

        const now = new Date().getTime(); // Get the current time
        const difference = countToDate.getTime() - now; // Calculate the time difference

        if (difference < 0) {
            clearInterval(interval); // Clear the interval if the countdown has ended
            document.getElementById('countdown-display').innerHTML = 'The countdown has ended!'; // Display end message
            return;
        }

        // Calculate days, hours, minutes, and seconds remaining
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        // Update the flip cards with the calculated values
        flip(
            document.querySelector('.flip-card #days-top'),
            document.querySelector('.flip-card #days-bottom'),
            String(days).padStart(2, '0') // Pad with leading zeros if necessary
        );
        flip(
            document.querySelector('.flip-card #hours-top'),
            document.querySelector('.flip-card #hours-bottom'),
            String(hours).padStart(2, '0')
        );
        flip(
            document.querySelector('.flip-card #minutes-top'),
            document.querySelector('.flip-card #minutes-bottom'),
            String(minutes).padStart(2, '0')
        );
        flip(
            document.querySelector('.flip-card #seconds-top'),
            document.querySelector('.flip-card #seconds-bottom'),
            String(seconds).padStart(2, '0')
        );
    };

    // Function to show the current time or the initial countdown state
    const showCurrentTime = () => {
        if (!countdownStarted) {
            updateClock(); // Update the clock if the countdown hasn't started
        }
    };

    showCurrentTime(); // Display initial countdown or current time
    interval = setInterval(showCurrentTime, 1000); // Update display every second

    // Event listener for the reset button to reload the page and reset the countdown
    document.getElementById('reset-button').addEventListener('click', function () {
        location.reload(); // Reload the page
        countdownStarted = false; // Reset the countdown started flag
    });

    // Event listener for the fullscreen button to enable fullscreen mode
    document.getElementById('fullscreen-button').addEventListener('click', function () {
        document.getElementById('countdown-display').requestFullscreen(); // Request fullscreen for the countdown display
    });
});
