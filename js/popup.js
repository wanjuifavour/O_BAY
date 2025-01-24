export const showPopup = (popupId) => {
    document.querySelectorAll(".popup").forEach(p => p.style.display = "none");
    const popup = document.getElementById(popupId);
    if (popup) {
        popup.style.display = "block";
    } else {
        console.error(`Popup with ID ${popupId} not found`);
    }
};

export const closePopup = () => {
    document.querySelectorAll(".popup").forEach(p => p.style.display = "none");
};