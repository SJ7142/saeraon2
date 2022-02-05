$(document).ready(function () {
  /*
   * �붾㈃ 濡쒕뱶�� �덈씪�� 而ㅻ━�� List瑜� 遺덈윭�⑤떎
   */
  $.ajax({
    url: '/saeraon/career/list',
    method: 'POST',
    success: function (res) {
      showJsonList(res)
    },
    error: function (e) {
      console.log('careerList error')
      console.log(e)
    },
  })
})
/*
 * �붾㈃濡쒕뱶�� ajax濡� 諛쏆� json �뺤떇�� �곗씠�컇ist瑜� �붾㈃�� 肉뚮젮二쇰뒗 function
 */
var showJsonList = function (res) {
  var today = new Date()
  var year = today.getFullYear()
  var month = ('0' + (today.getMonth() + 1)).slice(-2)
  var day = ('0' + today.getDate()).slice(-2)
  var currDate = year + '-' + month + '-' + day
  currDate = new Date(currDate)

  var status

  for (var i = res.length - 1; i >= 0; i--) {
    var endDate = new Date(res[i].endDate)
    //�좎쭨濡� status 蹂�寃쎈쭔�ㅼ뼱�쇳븿
    if (endDate < currDate) {
      status =
        document.querySelector('html').getAttribute('lang') === 'en'
          ? 'Ended'
          : '留덇컧'
    } else {
      status =
        document.querySelector('html').getAttribute('lang') === 'en'
          ? 'Realtime'
          : '�곸떆'
    }

    //�④��곹깭�멸쾬�� �쒖떆�섏��딄쾶留뚮뱾�댁빞��
    if (res[i].status == 'on') {
      $('.recruit-box-wrap').append(
        '<li>' +
          "<div class='recruit-status'>" +
          "<p class='status' data-value='" +
          res[i].num +
          "'>" +
          status +
          '</p>' +
          '</div>' +
          "<div class='recruit-content'>" +
          "<a href='" +
          res[i].link +
          "' data-value='" +
          res[i].num +
          "' target='_blank'>" +
          res[i].title +
          '<br />' +
          res[i].startDate +
          ' ~ ' +
          res[i].endDate +
          '</a>' +
          '</div>' +
          '</li>'
      )
    }
    if (status == '留덇컧' || status == 'Ended') {
      $(".status[data-value='" + res[i].num + "']").addClass('dead-on')
      $("a[data-value='" + res[i].num + "']").addClass('dead-on')
    } else if (status == '�곸떆' || status == 'Realtime') {
      $(".status[data-value='" + res[i].num + "']").removeClass('dead-on')
      $("a[data-value='" + res[i].num + "']").removeClass('dead-on')
    }
  }
}
