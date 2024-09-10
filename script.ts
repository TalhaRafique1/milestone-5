document.getElementById('resumeForm')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const profilePictureInput = document.getElementById('profilePicture') as HTMLInputElement;
    const nameElement = document.getElementById('name') as HTMLInputElement;
    const emailElement = document.getElementById('email') as HTMLInputElement;
    const phoneElement = document.getElementById('phone') as HTMLInputElement;
    const educationElement = document.getElementById('education') as HTMLInputElement;
    const experienceElement = document.getElementById('experience') as HTMLInputElement;
    const skillsElement = document.getElementById('skills') as HTMLInputElement;
    const usernameElement = document.getElementById('username') as HTMLInputElement;

    if (
        profilePictureInput && 
        nameElement && 
        emailElement && 
        phoneElement && 
        educationElement && 
        experienceElement && 
        skillsElement && 
        usernameElement
    ) {
        const name = nameElement.value;
        const email = emailElement.value;
        const phone = phoneElement.value;
        const education = educationElement.value;
        const experience = experienceElement.value;
        const skills = skillsElement.value;
        const username = usernameElement.value;

        const uniquePath = `resume/${username.replace(/\s+/g, '_')}_cv.html`;

        // Picture elements
        const profilePictureFile = profilePictureInput.files?.[0];
        const profilePictureUrl = profilePictureFile ? URL.createObjectURL(profilePictureFile) : "";

        const resumeOutput = `
            <h2>Resume</h2>
            ${profilePictureUrl ? `<img src="${profilePictureUrl}" alt="Profile Picture" class="profilePicture">` : ''}
            <p><strong>Name:</strong> <span id="edit-name" class="editable">${name}</span></p>
            <p><strong>Email:</strong> <span id="edit-email" class="editable">${email}</span></p>
            <p><strong>Phone:</strong> <span id="edit-phone" class="editable">${phone}</span></p>
            <h3>Education</h3>
            <p id="edit-education" class="editable">${education}</p>
            <h3>Experience</h3>
            <p id="edit-experience" class="editable">${experience}</p>
            <h3>Skills</h3>
            <p id="edit-skills" class="editable">${skills}</p>
        `;

        const resumeOutputElement = document.getElementById("resumeOutput") as HTMLElement;
        if (resumeOutputElement) {
            resumeOutputElement.innerHTML = resumeOutput; // Corrected from resumeHTML
            resumeOutputElement.classList.remove("hidden");

            const buttonsContainer = document.createElement("div");
            buttonsContainer.id = "buttonsContainer";
            resumeOutputElement.appendChild(buttonsContainer);

            const downloadButton = document.createElement("button");
            downloadButton.textContent = "Download as PDF";
            downloadButton.addEventListener("click", () => {
                window.print();
            });
            buttonsContainer.appendChild(downloadButton);

            const shareLinkButton = document.createElement("button");
            shareLinkButton.textContent = "Copy Shareable Link";
            shareLinkButton.addEventListener("click", async () => {
                try {
                    const shareableLink = `https://yourdomain.com/resumes/${name.replace(/\s+/g, "_")}_cv.html`;

                    await navigator.clipboard.writeText(shareableLink);
                    alert("Shareable link copied to clipboard");
                } catch (err) {
                    console.error("Failed to copy link: ", err);
                    alert("Failed to copy link to clipboard. Please try again.");
                }
            });
            buttonsContainer.appendChild(shareLinkButton);
        } else {
            console.error("Resume output container not fount");
        }
    } else {
        console.error("Form elements are missing");
    }
});
