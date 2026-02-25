document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("start-button");
  const startMenu = document.getElementById("start-menu");
  const programsDiv = document.getElementById("Programs");
  const programsMenuItem = document.getElementById("programs-menu-item"); // Select the "Programs" menu item
  const clock = document.getElementById("clock");

  // Get all elements with the class 'hi-my-name-is-what'
  const hiMyNameIsWhatElements = document.querySelectorAll(".hi-my-name-is-what");

  // Toggle Start Menu
  startButton.addEventListener("click", () => {
    startMenu.classList.toggle("thidden");
  });

  // Close the start menu when clicking outside
  document.addEventListener("click", (event) => {
    if (!startButton.contains(event.target) && !startMenu.contains(event.target) && !programsDiv.contains(event.target)) {
      startMenu.classList.add("thidden");
    }
  });

  // Show the Programs div when "Programs" is clicked
  programsMenuItem.addEventListener("click", () => {
    programsDiv.classList.toggle("phidden"); // Toggle visibility of the Programs div
    // Check if phidden is toggled off for the first time
    if (!programsDiv.classList.contains("phidden") && !document.getElementById("toggle-phidden-button")) {
      // If it's the first time toggling off, create a taskbar button
      createTaskbarButton();
    }
  });

  // Clock functionality
  const updateClock = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert to 12-hour format
    const formattedTime = `${hours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
    clock.textContent = formattedTime;
  };

  updateClock();
  setInterval(updateClock, 1000); // Update clock every second

  // Open a website when app1 icon is clicked
  const app1Icon = document.querySelector('[data-app="app1"]');
  app1Icon.addEventListener("click", () => {
    window.open("https://fealion.neocities.org/horse", "_blank");
  });

  // Toggle visibility of elements with the class 'hi-my-name-is-what' when app2 icon is clicked
  const app2Icon = document.querySelector('[data-app="app2"]');
  app2Icon.addEventListener("click", () => {
    hiMyNameIsWhatElements.forEach(element => {
      // Check the current display property using computed styles
      const currentDisplay = window.getComputedStyle(element).display;

      if (currentDisplay === "none") {
        element.style.display = "block"; // Show the element
      } else {
        element.style.display = "none"; // Hide the element
      }
    });
  });

  // Function to create a taskbar button
  function createTaskbarButton() {
    const taskbarApps = document.getElementById("taskbar-apps");

    // Create new taskbar button
    const taskbarButton = document.createElement("div");
    taskbarButton.classList.add("taskbar-item");
    taskbarButton.id = "toggle-phidden-button";
    taskbarButton.innerHTML = '<img src="pc.gif" alt="Toggle Programs">'; // Replace with an appropriate icon

    // Add event listener to toggle `.phidden` when clicked
    taskbarButton.addEventListener("click", () => {
      programsDiv.classList.toggle("phidden"); // Toggle visibility of Programs div
    });

    // Add the button to the taskbar
    taskbarApps.appendChild(taskbarButton);
  }
});
