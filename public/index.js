const file = document.getElementById('file')
const fileLabel = document.getElementById('file-label')


file.addEventListener('change', (ev) => {
    fileLabel.innerText = file.files[0].name
})
