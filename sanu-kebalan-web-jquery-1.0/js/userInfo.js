$(function () {
    // #region 修改使用者名稱
    let userName = localStorage.getItem('userName');
    if (userName) {
        $('.info-name').text('nengi aisu😊');
    } else {
        $('.info-name').text(userName);
    }

    // 修改名字
    $('.info-name').on('click', function () {
        Swal.fire({
            title: 'tiana nangan su?',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'on'
            },
            showCancelButton: true,
            confirmButtonText: 'wanay!',
            cancelButtonText: 'mai',
            inputValidator: (inputText) => {
                if (inputText) {
                    // 如果用户输入了文本，则将输入的文本设置为 .info-name 元素的新文本
                    $('.info-name').text(` nengi, ${inputText}`);
                    localStorage.setItem('userName', `${inputText}🫒`)
                } else if (inputText === '') {
                    $('.info-name').text('nengi aisu😊');

                } else {
                    // 如果用户没有输入文本，则显示验证信息
                    return '請填寫名稱!';
                }
            }
            // allowOutsideClick: () => !Swal.isLoading()
        });
    });
    // #endregion 修改使用者名稱

    // #region 修改頭貼
    // 修改頭貼
    // 預設頭貼清單
    let avatarList = "";
    $.ajax({
        url: "./data/avatar_setting.json",
        dataType: "json",
    })
        .done(function (result) {
            console.log(result);
            avatarList = result;
            sessionStorage.setItem('avatarList', JSON.stringify(result))
        })
        .fail(function (ex) {
            console.log("error");
            console.log("ex: ", ex);
        });;



    $('.info-avatar').on('click', async function () {
        /* inputOptions can be an object or Promise */
        // 假设 avatarList 如下初始化，确保它在此上下文中可用


        // 首先檢查是否已有數據
        let avatarUrl = localStorage.getItem("avatarUrl");
        if (!avatarUrl) {
            $('.info-avatar').css('background-image', avatarUrl);
        }


        const inputOptions = new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    1: "女性禮服",
                    2: "男性族服",
                    3: "女性族服",
                    4: "梅花鹿紋",
                    5: "木雕男性",
                    6: "木雕男二",
                    7: "蠶絲瑪瑙",
                    8: "角花落地",
                    9: "方紋流流",
                });
            }, 1000);
        });

        const { value: avatarId } = await Swal.fire({
            title: "niana zais su?",
            input: "radio",
            inputOptions,
            inputValidator: (value) => {
                if (!value) {
                    return "請選擇!";
                }
            }
        });

        if (avatarId) {
            let avrUrl = avatarList.find(s => s.id == avatarId).url;
            console.log(avrUrl);
            $('.info-avatar').css('background-image', `url(${avrUrl})`); // 替換頭貼(圖片路徑)
            Swal.fire({ 
                html: 
                `zau zais ti su:<br/>
                <img class='rounded-circle' src=${avrUrl} alt='avatar'></img>
                ` 
            });
            localStorage.setItem('avatarUrl', avatarUrl);

        }

    });

    // #endregion 修改頭貼


})