$(document).ready(function () {
  //寃��됰쾭�� �대┃�� �대떦�섏씠吏� �곗씠�곕━�ㅽ듃 遺덈윭�ㅺ린
  $('#searchBtn').on('click', function () {
    var searchKey = $('#searchKey').val()
    callList(1, searchKey)
  })
  //寃��됱뼱 �뷀꽣�대깽��
  $('#searchKey').keydown(function (e) {
    if (e.keyCode == 13) {
      event.preventDefault()
      $('#searchBtn').trigger('click')
    }
  })

  callList()
  // news page move
  /*
    $(".page2>button, .next-btn").click(function () {
      $(".news1").css("display", "none");
      $(".news2").css("display", "flex");
    });
    $(".page1>button, .prev-btn").click(function () {
      $(".news2").css("display", "none");
      $(".news1").css("display", "flex");
    });
  
    let page_count = $(".page").length;
    for (i = 0; i < page_count; i++) {
      let i_count = i;
      $(".page")
        .eq(i)
        .children("button")
        .click(() => {
          $(".page-wrap > ul").removeClass("page-on");
          $(".page-wrap > ul").eq(i_count).addClass("page-on");
  
          $(".page > button").removeClass("page-on");
          $(".page").eq(i_count).children("button").addClass("page-on");
        });
  
      $(".arrow-btn")
        .eq(i)
        .children("button")
        .click(() => {
          $(".page-wrap > ul").removeClass("page-on");
          $(".page-wrap > ul").eq(i_count).addClass("page-on");
  
          $(".page > button").removeClass("page-on");
          $(".page").eq(i_count).children("button").addClass("page-on");
        });
    }
  
    // news view more button
    $(".news-more-btn").click(function () {
      $(".news-more-btn > span").toggleClass("news-on");
      if ($(".news-more-btn > span").hasClass("news-on")) {
        $(".news2").css("display", "flex");
        $(".news2 > li").css("margin", "30px 0 0 0");
        $(".news1").css("margin", "0");
      } else {
        $(".news2").css("display", "none");
        $(".news1").css("margin", "0 0 50px 0");
      }
    });
    $(window).resize(function () {
      if ($(window).width() > 1023) {
        $(".news2").css("display", "none");
      }
    });
    */
})

/*
 * data list 媛��몄삤湲�
 * param {
 *	 1. page : �대룞�� �먰븯�� �섏씠吏�
 *	 2. 寃��됱뼱 : 寃��됱뼱
 *	}
 */
var callList = function (page, searchKey) {
  console.log('searchKey�뺤씤', searchKey)
  //�レ옄瑜� json�쇰줈 �섍린湲곗쐞�� 臾몄옄濡� 蹂�寃�
  if (page === undefined) {
    page = '1'
  } else {
    page += ''
  }
  //寃��됱뼱 �놁쓣�� 怨듬갚�쇰줈 泥섎━
  if (searchKey === undefined) searchKey = ''

  //backend�� 蹂대궪 json data
  var data = {
    page: page,
    searchKey: searchKey,
  }
  //ajax�듭떊
  $.ajax({
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    method: 'POST',
    //saeraon寃쎈줈蹂�寃�
    url: '/saeraon/news/pagingSerchList.do',
    data: JSON.stringify(data),
    success: function (result) {
      //湲곗〈�� �앹꽦�� �숈쟻�붾㈃ ��젣
      $('#dataList').html('')

      for (var i = result.length - 1; i >= 0; i--) {
        $('#dataList').append(
          `
            <li>
                <a href="` +
            result[i].link +
            `" target="_blank">
                  <div class="news-img">
                    <img src="` +
            result[i].img +
            `" alt="蹂대룄�먮즺 愿��� �대�吏�` +
            i +
            `">
                  </div>
                  <div class="news-content">
                    <p>` +
            result[i].title +
            `</p>
                    <p>` +
            result[i].txt +
            `</p>
                    <p>` +
            result[i].date +
            `</p>
                  </div>
                </a>
            </li>
            `
        )
      }
    },
    error: function (result) {
      console.log('error')
    },
  })

  /*
   * page�뺣낫 媛��몄삤湲�
   */

  var pageData = {
    page: page,
    searchKey: searchKey,
  }
  $.ajax({
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    method: 'POST',
    //saeraon寃쎈줈蹂�寃�
    url: '/saeraon/news/pageInfo.do',
    data: JSON.stringify(pageData),
    success: function (result) {
      console.log('page�뺣낫' + JSON.stringify(result))
      //湲곗〈 �숈쟻�앹꽦�� �섏씠吏� ��젣
      $('#pageUl').html('')
      //�댁쟾, �ㅼ쓬踰꾪듉�� �곌린�꾪븳 �レ옄
      var sPageNo = result.sPageNo
      var ePageNo = result.ePageNo
      var before = parseInt(sPageNo) - 1
      var next = parseInt(ePageNo) + 1

      // 6~10 �섏씠吏�媛� �덈굹�ㅻ뒗 踰꾧렇�닿껐��
      sPageNo = sPageNo == '6' ? 6 : sPageNo

      //�댁쟾踰꾪듉 �쒖떆
      $('#arrowUl > .arrow-btn:first-child').empty()
      $('#arrowUl > .arrow-btn:first-child').append(
        `
            <button class="prev-btn" onclick="callList(` +
          before +
          `,` +
          searchKey +
          `)">
                  <img src="/images/news/arrow-prev.png" alt="�붿궡�� 寃�����" />
            </button>
            `
      )
      //sPageNo(�쒖옉�섏씠吏�)媛� 1�쇰븣 �댁쟾踰꾪듉 臾댄슚��
      if (sPageNo == 1) {
        $('#arrowUl > .arrow-btn:first-child').css('pointer-events', 'none')
      }

      //�섏씠吏�
      for (var j = sPageNo; j <= ePageNo; j++) {
        $('#pageUl').append(
          `<li class="page">
                <button type="button" class="pageBtn` +
            j +
            `"
                onclick="callList(` +
            j +
            `,` +
            searchKey +
            `)">` +
            j +
            `</button>
              </li>
              `
        )
        $('#pageUl').children('.page').eq(0).addClass('page-on')
      }

      //�ㅼ쓬踰꾪듉 �쒖떆 議곌굔嫄멸린
      $('#arrowUl > .arrow-btn:last-child').empty()
      $('#arrowUl > .arrow-btn:last-child').append(
        `
             <button class="prev-btn" onclick="callList(` +
          next +
          `,` +
          searchKey +
          `)">
                   <img src="/images/news/arrow-next.png" alt="�붿궡�� 寃�����" />
             </button>
             `
      )
      //
      if (ePageNo == result.totalPage) {
        $('#arrowUl > .arrow-btn:last-child').css('pointer-events', 'none')
      }

      /*if (ePageNo != result.totalPage) {
          $("#pageUl").append(
            "<button onclick=callList(" +
              next +
              ",'" +
              searchKey +
              "')> �ㅼ쓬 </button>"
          );
        }
        */

      $('.pageBtn' + result.page).addClass('page-on')
    },
    error: function (result) {
      console.log('�섏씠吏� �뺣낫 error')
    },
  })
} //callList
