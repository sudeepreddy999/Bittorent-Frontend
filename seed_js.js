const dropArea = document.getElementById('upload-area');
const fileInput = document.getElementById('fileInput');
const fileElem = document.getElementById('fileElem');
const itemList = document.getElementById('item-list');

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

function highlight() {
    dropArea.classList.add('hover');
}

function unhighlight() {
    dropArea.classList.remove('hover');
}
function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;
    handleFiles(files);
}
fileElem.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', () => handleFiles(fileInput.files));

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false);
    document.body.addEventListener(eventName, preventDefaults, false);
});

['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, highlight, false);
});

['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, unhighlight, false);
});

dropArea.addEventListener('drop', handleDrop, false);
function handleFiles(files) {
    if (files.length === 0) {
        return; // Exit if no files
    }
    Array.from(files).forEach(file => {
        const displayName = file.webkitRelativePath || file.name;
        addFileToList(file, displayName);
    });
}
function addFileToList(file, displayName) {
    const item = document.createElement('div');
    item.className = 'item-container';

    const formattedFileSize = formatFileSize(file.size);
    item.innerHTML = `
            <div class="item-content">
                <p class="item-name">${displayName}</p>
                <p class="item-status">0 of ${formattedFileSize}</p>
            </div>
            <div class="progress-content">
                <div class="progress-bar">
                    <div class="progress-bar-fill" style="width: 0%;"></div>
                </div>
                <p class="progress-percentage">0%</p>
            </div>
        `;
    itemList.appendChild(item);
}
function formatFileSize(size) {
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
        size /= 1024;
        unitIndex++;
    }

    return `${size.toFixed(1)} ${units[unitIndex]}`;
}
function updateProgressBar() {
    const itemContainers = document.querySelectorAll('.item-container');
    itemContainers.forEach(container => {
        const statusText = container.querySelector('.item-status').textContent;
        const regex = /([\d.]+)\s+(B|KB|MB|GB|TB)\s+of\s+([\d.]+)\s+(B|KB|MB|GB|TB)/;
        const match = statusText.match(regex);
        if (match) {
            const currentSize = parseFloat(match[1]);
            const currentUnit = match[2];
            const totalSize = parseFloat(match[3]);
            const totalUnit = match[4];
            const sizeInBytes = convertToBytes(currentSize, currentUnit);
            const totalSizeInBytes = convertToBytes(totalSize, totalUnit);
            const progressPercentage = (sizeInBytes / totalSizeInBytes) * 100;
            const progressBarFill = container.querySelector('.progress-bar-fill');
            progressBarFill.style.width = `${progressPercentage}%`;
            const percentageText = container.querySelector('.progress-percentage');
            percentageText.textContent = `${Math.round(progressPercentage)}%`;
        }
    });
}
function convertToBytes(size, unit) {
    const units = { B: 1, KB: 1024, MB: 1024 ** 2, GB: 1024 ** 3, TB: 1024 ** 4 };
    return size * units[unit];
}



const download_sec = document.getElementsByClassName('download_sec')[0];
const seed_sec = document.getElementsByClassName('seed')[0];
const download_tab = document.getElementById('download');
const seed_tab = document.getElementById('seed');

download_tab.onclick = function () {

    download_sec.style.display = 'block';
    download_tab.style.backgroundColor = 'rgba(34, 56, 73, 0.446)';
    seed_sec.style.display = 'none';
};

seed_tab.onclick = function () {

    seed_sec.style.display = 'block';
    seed_tab.style.backgroundColor = 'rgba(34, 56, 73, 0.446)';
    download_sec.style.display = 'none';
};


const downloadIcon = document.getElementById('download_icon');

downloadIcon.addEventListener('click', function () {

    const seedSection = document.querySelector('.seed');
    seedSection.style.display = 'none';


    const downloadSection = document.querySelector('.download_sec');
    downloadSection.style.display = 'block';
});


const downloadDropArea = document.getElementById('download-upload-area');
const downloadFileInput = document.getElementById('download-fileInput');
const downloadFileElem = document.getElementById('download-fileElem');
const downloadItemList = document.getElementById('download-item-list');

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    downloadDropArea.addEventListener(eventName, preventDefaults, false);
    document.body.addEventListener(eventName, preventDefaults, false);
});

['dragenter', 'dragover'].forEach(eventName => {
    downloadDropArea.addEventListener(eventName, highlight, false);
});


['dragleave', 'drop'].forEach(eventName => {
    downloadDropArea.addEventListener(eventName, unhighlight, false);
});


downloadDropArea.addEventListener('drop', handleDownloadDrop, false);


downloadFileElem.addEventListener('click', () => downloadFileInput.click());
downloadFileInput.addEventListener('change', () => handleDownloadFiles(downloadFileInput.files));

function handleDownloadDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;
    handleDownloadFiles(files);
}

function handleDownloadFiles(files) {
    if (files.length === 0) return; // Exit if no files

    Array.from(files).forEach(file => {
        const displayName = file.webkitRelativePath || file.name;
        addDownloadFileToList(file, displayName);
    });
}

function addDownloadFileToList(file, displayName) {
    const item = document.createElement('div');
    item.className = 'item-container';

    const formattedFileSize = formatFileSize(file.size);
    item.innerHTML = `
        <div class="item-content">
            <p class="item-name">${displayName}</p>
            <p class="item-status">0 of ${formattedFileSize}</p>
            <p class="item-status">0 out of 13 peers</p>
        </div>
        <div class="progress-content">
            <div class="icon-controls">
                <i class="fas fa-trash"></i>
                <i class="fas fa-pause"></i>
                <i class="fas fa-play"></i>
            </div>
            <div class="progress-bar">
                <div class="progress-bar-fill" style="width: 0%;"></div>
            </div>
            <p class="progress-percentage">0%</p>
        </div>
    `;
    downloadItemList.appendChild(item);
    updateProgressBar();
}


var modal = document.getElementById("torrentModal");

var torrentLink = document.querySelector(".box2 p");


var closeBtn = document.getElementsByClassName("close")[0];


torrentLink.onclick = function () {
    modal.style.display = "flex";
}

closeBtn.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
