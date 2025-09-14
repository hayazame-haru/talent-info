/* this was inspired by the anon drawings one that you can find in https://drawbox.nekoweb.org*/
/* setup is the same but you can try finding the entry for spotify one if you tried to view the page source in google forms*/
/* I just got lazy and asked a bot to look it for me cuz the page source is legit messy and everywhere and hard to spot even with ctrl f*/
/* also idfk how to code I'm more of an artist and rigger than a coder so this has aspects from a bot + asking a classmate irl for help so I owe my classmate a credit too, go apeshit with the js*/
/* TUTORIAL HOLD ON, you can use the same google forms and sheets from the drawbox js one but you'll need to make 2 additional questions in the forms for the "anons" and "spotify" section make sure both are short answered questions too, make sure the spotify link one is Response validation -> Text -> Contains -> open.spotify.com -> Please enter a valid spotify link, after that just refer to the tutorial from drawbox js and some of the things I've mentioned on this js then it should work*/

document.addEventListener("DOMContentLoaded", () => {
  const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdFdOvf4zufRoSt0i8UJW3D5cANkp9CwgMNtpKdd1vYPRMnew/formResponse";
  const ENTRY_LETTER = "entry.30926629";
  const ENTRY_SPOTIFY = "entry.1792399021";

  document.body.addEventListener("click", async (e) => {
    if (!e.target.classList.contains("ms-submit")) return;

    const button = e.target;
    const container = button.closest(".ms-window");
    if (!container) return;

    const letterInput = container.querySelector("#anonLetter");
    const spotifyInput = container.querySelector("#spotifyLink");
    const statusText = container.querySelector("#statusLetter");

    if (!letterInput || !statusText) return;

    const letter = letterInput.value.trim();
    const spotify = spotifyInput ? spotifyInput.value.trim() : "";

    if (!letter) {
      statusText.textContent = "⚠️ Please write a letter before submitting.";
      return;
    }

    button.disabled = true;
    statusText.textContent = "✉️ Sending...";

    const formData = new FormData();
    formData.append(ENTRY_LETTER, letter);
    if (spotify) formData.append(ENTRY_SPOTIFY, spotify);

    console.log("Submitting Anon Letter:");
    for (const [key, value] of formData.entries()) {
      console.log(key, "=>", value);
    }

    try {
      await fetch(GOOGLE_FORM_URL, {
        method: "POST",
        body: formData,
        mode: "no-cors" 
      });

      statusText.textContent = "📮 Letter delivered!";
      letterInput.value = "";
      if (spotifyInput) spotifyInput.value = "";
      console.log("Submission sent to Google Forms!");
    } catch (err) {
      console.error("Submit error:", err);
      statusText.textContent = "❌ Failed.";
    } finally {
      button.disabled = false;
    }
  });
});

