const   $ = (x) => { return document.querySelector(x) }
const   $$ = (x) => { return document.querySelectorAll(x) }

// Code
const   
app = {
    Render: function() {
        const   List = $('.List')
        const   ListOfChemistry = $('.ListOfChemistry')

        const   Types = [
            {
                name: 'Nguyên T?',
                class: 'NguyenTo',
                length: 80
            },
            { 
                name: 'Axit',
                class: 'Axit',
                length: 19
            },
            { 
                name: 'Bazo',
                class: 'Bazo',
                length: 44
            },
            { 
                name: 'Oxit',
                class: 'Oxit',
                length: 83
            },
            { 
                name: 'Mu?i',
                class: 'Muoi',
                length: 346
            },
            { 
                name: 'Thu?t ng?',
                class: 'ThuatNgu',
                length: 121
            }
        ]
        //  Main Render

                //  Render List 
                let htmls = Types.map(Type => {
                    return `<button class="Type">
                                <div class="Content">
                                    <h3>${Type.name}</h3>
                                </div>
                                <div class="Selection">
                                    <ion-icon class ="Show" name="checkmark-circle-sharp"></ion-icon>
                                    <ion-icon class ="Hide" name="close-circle-sharp"></ion-icon>
                                </div>
                            </button>`
                })
                List.innerHTML = htmls.join('')

                // Render Types

                htmls = Types.map(Type => {
                    return `<div class="MainType Hide">
                                <div class="MainTypeName">
                                    <div class = "Name">
                                        <p>${Type.name}</p>
                                    </div>
                                    <div class = "SoLuong">
                                        <p>[${Type.length}]</p>
                                    </div>
                                </div>
                                <div class="MainTypeList ${Type.class}"></div>
                            </div>`
                })
                ListOfChemistry.innerHTML = htmls.join('')

        // Sub Render

        const SubRender = ( Arr , NameOfArr ) => {
            if(NameOfArr != 'ThuatNgu')  {
                Arr.sort((a,b) => {
                    let aN = a.symbol
                    let bN = b.symbol
                    return aN.localeCompare(bN)
                })
            }
            const htmls = Arr.map(Item => {
                return `<div class="Chemical">
                            <div class="MainChemical">
                                <div class="ChemicalName">
                                    <div class = "Symbol">
                                        <p>${Item.symbol}</p>
                                    </div>
                                    <div class = "Name">
                                        <p>[${Item.name}]</p>
                                    </div>
                                </div>
                                <div class="ChemicalOption">
                                    <ion-icon name="star-sharp"></ion-icon>
                                </div>
                            </div>
                            <div class="SubChemical">
                                <div class="SChemicalName">
                                    <p>${Item.transcribe}</p>
                                </div>
                                <div class="SChemicalOption">
                                    <ion-icon name="volume-high-outline"></ion-icon>
                                </div>
                            </div>
                            <audio class="Voice" src="${Item.sound}">
                        </div>`
            })
            $(`.MainTypeList.${NameOfArr}`).innerHTML = htmls.join('')
        }

        SubRender(NguyenTo, 'NguyenTo')
        SubRender(Axit, 'Axit')
        SubRender(Bazo, 'Bazo')
        SubRender(Oxit, 'Oxit')
        SubRender(Muoi, 'Muoi')
        SubRender(ThuatNgu, 'ThuatNgu')

        // -------------------------------------------
        $('.Symbol').innerHTML = '<h1>Phân lo?i</h1>'
    },
    Search: function() {
        const   SearchBoxInput = $('.SearchBox-Input')
        const   ResultBox = $('.ResultBox')
        const   DelBtn = $('.DelBtn')
        // --------------------------------
        SearchBoxInput.onkeyup = () => {
            let UserData = SearchBoxInput.value
            if( UserData ) {
                const   check = ( obj ) => {
                    const SubCheck = (s, st) => {
                        s = s.toLowerCase()
                        st = st.toLowerCase()

                        let i = 0
                        for(let j = 0; j < st.length; ++j) i = (s[i] == st[j]) ? i + 1 : i
                        return i == s.length
                    }
                    return (SubCheck(UserData,obj.symbol))
                }
                let ArrResult = Items.filter(check)

                ArrResult.sort((a,b) => {
                    let     str = UserData[0].toLowerCase()
                    let     x = a.symbol.indexOf(str)
                    let     y = b.symbol.indexOf(str)
                    return x - y
                })
                while( ArrResult.length > 7 ) ArrResult.pop()
                ArrResult.sort((a,b) => {
                    let aN = a.symbol
                    let bN = b.symbol
                    return aN.localeCompare(bN)
                })
                let htmls = ArrResult.map(obj => {
                    return `
                            <div class="ResultItem">
                                <div class="BlockEffect"></div>
                                <div class="BlockContent">
                                    <div class="Main">
                                        <div class="Name">
                                            <p>${obj.symbol}</p>
                                        </div>
                                        <div class="SmallName">
                                            <p>[${obj.name}]</p>
                                        </div>        
                                        <button class="Option OptionShow">
                                            <ion-icon name="ellipsis-horizontal-sharp"></ion-icon>
                                        </button>
                                    </div>
                                    <div class="Sub">
                                        <div class="Name">
                                            <p>${obj.transcribe}</p>
                                        </div>
                                        <button class="Option OptionVoice">
                                            <ion-icon name="volume-high-outline"></ion-icon>
                                        </button>
                                    </div>
                                    <audio class="ResultVoice" src="${obj.sound}">
                                </div>
                            </div>`
                })
                ResultBox.innerHTML = htmls.join('')
                DelBtn.style.opacity = 1
            } else {
                DelBtn.style.opacity = 0
                ResultBox.innerHTML = ''    
            }

            let   ResultItems = $$('.ResultItem')
            let   OptionShow = $$('.OptionShow')  
            let   OptionVoice = $$('.OptionVoice')  
            let   Sounds = $$('.ResultVoice')  
            for(let i = 0; i < OptionShow.length; ++i) {
                ResultItems[i].dbclick = () => console.log('Chon' + i)	

                OptionShow[i].onclick = () => {
                    if( ResultItems[i].className.indexOf("ShowSub") > -1 ) {
                        ResultItems[i].classList.remove("ShowSub")
                    } else {
                        ResultItems[i].classList.add("ShowSub")
                    }
                }
                OptionVoice[i].onclick = () => Sounds[i].play()
            }
        }

        DelBtn.onclick = () => {
            SearchBoxInput.value = ''
            DelBtn.style.opacity = 0
            ResultBox.innerHTML = ''
        }

        // Xu ly khi click vao ket qua
    },
    handleEventTypes: function() {
        const   Types = $$('.Type')
        const   MainTypes = $$('.MainType')

        MainTypes[0].classList.remove('Hide')
        Types[0].classList.add('Selected')



        for(let i = 0; i < Types.length; ++i) {
            Types[i].onclick = () => {
                if( Types[i].className.indexOf('Selected') == -1) {
                    Types[i].classList.add('Selected')
                    MainTypes[i].classList.remove('Hide')

                    for(let j = 0; j < Types.length; ++j) {
                        if(j != i) {
                            Types[j].classList.remove('Selected')
                            MainTypes[j].classList.add('Hide')
                        }
                    }
                    
                    const   ChemicalShowSub = $$('.Chemical.ShowSubChemical')

                    for(let k = 0; k < ChemicalShowSub.length; ++k) {
                        ChemicalShowSub[i].classList.remove('ShowSubChemical')
                    }
                }
            }
        }
    },
    handleEventChemicals: function() {
        const   Chemicals = $$('.Chemical')
        const   ChemicalOptions = $$('.ChemicalOption')
        const   SChemicalOptions = $$('.SChemicalOption')
        const   Voices = $$('.Voice')

        for(let i = 0; i < Chemicals.length; ++i) {
            ChemicalOptions[i].onclick = () => {
                if( Chemicals[i].className.indexOf('ShowSubChemical') > -1) {
                    Chemicals[i].classList.remove('ShowSubChemical')
                } else {
                    Chemicals[i].classList.add('ShowSubChemical')
                }
            }

            SChemicalOptions[i].onclick = () => {
                Voices[i].play()
            }
        }
    },
    start: function() {
        this.Render()
        this.Search()
        this.handleEventTypes()
        this.handleEventChemicals()
    }
}

app.start()

