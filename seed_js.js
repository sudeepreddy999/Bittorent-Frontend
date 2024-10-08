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