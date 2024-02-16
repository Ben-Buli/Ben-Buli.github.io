$(function () {
    let tiRuR = "tiRuR";
    let yau = "yau";

    /**
     * @returns {string} 數字對照的族語
     */
    let kblNum = {
        0: "tiRuR",
        1: "ussiq",
        2: "uzusa",
        3: "utulu",
        4: "usepat",
        5: "ulima",
        6: "unem",
        7: "upitu",
        8: "uwalu",
        9: "usiwa",
        10: "Rabetin",
        100: "Rasibu",
        1000: "Melalazan",
        10000: "ban",
        100000000: "iq",
        1000000000000: "caw"
    };

    /**
     * @returns {string} 單位的值
     */
    let digits = {
        0: 'No number input.', // 沒有接收到數字
        1: '', // 至少1位數 [個]
        2: 'betin', // 至少2位數 [十]
        3: 'Rasibu', // 至少3位數 [百]
        4: 'lalazan', // 至少4位數 [千]
        5: 'ban', // 至少5位數 [萬]
        9: 'iq', // > 8位數 [億]
        13: 'caw', // > 12位數 [兆]
        16: 'Over limited, unable to clculator.', // 超過千兆.
    };

    /**
     * @param {Number} iRevIndex: 物件反轉後的索引 (倒數第n個)
     * @param {Number} arrRevIndex: 陣列反轉後的索引 (倒數第n個)
     * @returns {string} 處理數字單位字串
     */
    const getDigits = (arrRevIndex, iRevIndex) => {
        // 千位數以內(倒數第一組子陣列)
        switch (true) {
            case arrRevIndex === 4 && iRevIndex === 1:
                return digits[12]; // 兆位 
            case arrRevIndex === 3 && iRevIndex === 1:
                return digits[8]; // 億位 
            case arrRevIndex === 2 && iRevIndex === 1:
                return digits[5]; // 萬位 
            case iRevIndex === 4:
                return digits[4]; // 千位 
            case iRevIndex === 3:
                return digits[3]; // 百位 
            case iRevIndex === 2:
                return digits[2]; // 十位 
            case iRevIndex === 1:
                return digits[1]; // 個位
            default:
                return '';
        }
    };

    /**
     * 加法函數，返回兩個數字的和。
     * @param {number} num 要翻譯的數字。
     * @returns {number[][]} 執行數字巢狀陣列化。
     */
    const getKblNumStr = (num) => {
        // 將數字轉換為字串，然後轉換為數字陣列，並反轉陣列順序
        const numArray = num.toString().split('').map(Number).reverse();

        // 將數字陣列拆分為多個陣列，每個陣列最多包含四個元素
        const nestedArray = [];
        for (let i = 0; i < numArray.length; i += 4) {
            // nestedArray.push(numArray.slice(i, i + 4));
            nestedArray.unshift(numArray.slice(i, i + 4).reverse()); // 將子陣列反轉，再反轉子陣列中的排序
        }

        return nestedArray; // [ [ 1 ], [ 2, 3, 4, 5 ] ]
    }

    /**
     * 加法函數，返回兩個數字的和。
     * @param {number[]} childArr 要翻譯的數字陣列(子陣列)。
     * @param {number} arrRevIndex 反向索引 : 判斷數位(億、兆、萬)使用。
     * @returns {string} 將數字轉族語。
     */
    const num2kbl = function (childArr, arrRevIndex) {
        let result = '';
        let childArrLength = childArr.length;
        let lastNumber = childArr[-1];

        // #region 無值、超值、數字0
        if (childArrLength == 0) {
            return digits[0];
        } else if (childArrLength > 16) {
            return digits[16];
        } else if (lastNumber === 0) {
            return kblNum[0]; // 數值為 0
        }
        // #endregion

        //#region 處理個別數值轉族語
        for (let i = 0; i < childArrLength; i++) {
            // 判斷為十位數 index = -2
            let cur = kblNum[childArr[i]]; // 族語字串
            let curInt = childArr[i]; // 子陣列中的數值
            let isFirst = i === 0;
            let isLast = i === childArrLength - 1;
            let itemRevIndex = childArrLength - i; // 該數值的反向索引(倒數第n個)


            if (curInt > 0 && !isFirst && isLast) {
                // 個位數大於 0，且不為第一個值
                result += ` ${yau} ${cur} ${getDigits(arrRevIndex, itemRevIndex) ?? ''}`;
            } else {
                result += ` ${cur} ${getDigits(arrRevIndex, itemRevIndex) ?? ''}`;
            }
        }
        // #endregion

        return result.trim();
    };

    // 執行巢狀數字陣列後，將資料迴圈執行族語翻譯
    const excuteInt2Kebalan = (num) => {
        let result = '';
        let resArr = [];
        let arr = getKblNumStr(num); // 取得巢狀數字陣列
        // console.log(`${num} :`, arr);

        // 將每組數字陣列轉為族語
        for (let i = 0; i < arr.length; i++) {
            let childArr = arr[i];
            let arrRevIndex = arr.length - i; // 計算反向索引 

            resArr.push(num2kbl(childArr, arrRevIndex));
        }

        result = `${resArr.join(', ')}.`;
        return result;
    };


    // 測試函式
    // console.log(excuteInt2Kebalan(123456));     // [[1],[2,3,4,5]]
    // 輸入數字及翻譯
    $('#numInput').on('input', function (e) {
        e.preventDefault();

        let inputNum = $('#numInput').val();
        let result = excuteInt2Kebalan(inputNum);
        // console.log(excuteInt2Kebalan(inputNum));     // [[1],[2,3,4,5]]

        $('#kblResult').text(result);
    })

    // 複製按鈕
    $('#copyBtn').on('click', function(e) {
        var text = $('#kblResult').text();

      
    
    navigator.clipboard.writeText(text).then(function() {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: '文字已複製',
            showConfirmButton: false,
            timer: 1500
        });
    })
    .catch(function(err) {
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: '複製失敗',
            showConfirmButton: false,
            timer: 1500
        });
    });
    })
    

})

