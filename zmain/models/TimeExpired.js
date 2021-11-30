function setTimeExpired() {
    let timeExpired = new Date();
    timeExpired.setTime(timeExpired.getTime() + 1 * 24 * 60 * 60 * 1000);
    localStorage.setItem('timeExpired', JSON.stringify(timeExpired.toString()));
}
