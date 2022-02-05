var lang
var obj = {
  ko: {
    select: 'Select a business field inquiry.',
    name: 'Please insert your name.',
    tel: 'Please insert your cellphone.',
    mail: 'Please insert your e-mail.',
    mailCheck: 'Please use a valid e-mail format.',
    content: 'Please write your inquiry context.',
    agree: 'Update preferences.',
    success: 'Uploaded successfully.',
    fail: 'Upload failed. Please check with admin.',
  },
  en: {
    select: 'Select a business field inquiry.',
    name: 'Please insert your name.',
    tel: 'Please insert your cellphone.',
    mail: 'Please insert your e-mail.',
    mailCheck: 'Please use a valid e-mail format.',
    content: 'Please write your inquiry context.',
    agree: 'Update preferences.',
    success: 'Uploaded successfully.',
    fail: 'Upload failed. Please check with admin.',
  },
}

if (document.querySelector('html').getAttribute('lang') === 'ko') {
  lang = obj.ko
} else {
  lang = obj.en
}

$(document).ready(function () {
  var selectCheck = false
  //select諛뺤뒪 �좏깮�щ��뺤씤
  $('#select').on('change', function () {
    if ($('#select > option:selected').val() != '') {
      selectCheck = true
    } else {
      selectCheck = false
    }
  })

  // �뱀닔臾몄옄 �뺢퇋�� 蹂���(怨듬갚 誘명룷��)
  var replaceChar = /[~!@\#$%^&*\()\-=+_'\;<>0-9\/.\`:\"\\,\[\]?|{}]/gi
  // �꾩꽦�� �꾨땶 �쒓� �뺢퇋��
  var replaceNotFullKorean = /[��-�롢뀖-��]/gi
  $('#name')
    .on('focusout', function () {
      var x = $(this).val()
      if (x.length > 0) {
        if (x.match(replaceChar) || x.match(replaceNotFullKorean)) {
          x = x.replace(replaceChar, '').replace(replaceNotFullKorean, '')
        }
        $(this).val(x)
      }
    })
    .on('keyup', function () {
      $(this).val($(this).val().replace(replaceChar, ''))
    })

  //�꾪솕踰덊샇 �レ옄留뚯엯��
  $('#tel').on('keyup keydown keypress', function () {
    var tel = $('#tel').val()
    var telRegExp = /[^0-9]/g
    $('#tel').val(tel.replace(telRegExp, ''))
  })

  /*
   * '21.10.29.(湲�) | HSB
   * 臾몄쓽�ы빆 �깅줉
   * �뚯씪怨� �띿뒪�몃� Controller�⑥쑝濡� 蹂대궡�� db�� ���� 諛� �뚯씪�낅줈�쒕� �쒕떎.
   */
  $('#subBtn').on('click', function () {
    //validation
    var company = $('#company').val()
    var name = $('#name').val()
    var tel = $('#tel').val()
    var mail = $('#mail').val()
    var content = $('#content').val()

    //���됲듃諛뺤뒪 泥댄겕�щ�
    if (selectCheck == false) {
      // alert("臾몄쓽 �ъ뾽遺�臾몄쓣 �좏깮�댁＜�몄슂.");
      alert(lang.select)
      return false
    }

    //�대쫫怨듬갚�쒓굅
    name = name.replace(/\s/gi, '')
    if (name == '' || name == null) {
      // alert("�대쫫�� �낅젰�댁＜�몄슂.");
      alert(lang.name)
      return false
    }

    if (tel == '' || tel == null) {
      // alert("�꾪솕踰덊샇瑜� �낅젰�댁＜�몄슂.");
      alert(lang.tel)
      return false
    }
    //硫붿씪怨듬갚�쒓굅
    mail = mail.replace(/\s/gi, '')
    if (mail == '' || mail == null) {
      // alert("�대찓�쇱쓣 �낅젰�댁＜�몄슂.");
      alert(lang.mail)
      return false
    }
    //硫붿씪�뺤떇
    var mailRegExp =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
    if (mail.match(mailRegExp) == null) {
      // alert("�대찓�쇳삎�앹쓣 以��섑빐二쇱꽭��.");
      alert(lang.mailCheck)
      return false
    }

    //�댁슜怨듬갚�쒓굅
    content = content.replace(/\s/gi, '')
    if (content == '' || content == null) {
      // alert("臾몄쓽�댁슜�� �낅젰�댁＜�몄슂.");
      alert(lang.content)
      return false
    }
    //泥댄겕諛뺤뒪 泥댄겕�щ��뺤씤
    if ($('#agreeCheck').is(':checked') == false) {
      // alert("�섏떊�숈쓽�� 泥댄겕�댁＜�몄슂.");
      alert(lang.agree)
      return false
    }

    var formData = new FormData()
    formData.append('select', $('#select option:selected').val())
    formData.append('company', $('#company').val())
    formData.append('name', $('#name').val())
    formData.append('tel', $('#tel').val())
    formData.append('mail', $('#mail').val())
    formData.append('content', $('#content').val())
    formData.append('upFile', $('#bizFile')[0].files[0])

    //formData�� �덈뒗寃껊뱾�� 釉뚮씪�곗� 肄섏넄濡� �뺤씤�섎뒗 濡쒖쭅
    //�ㅽ뻾�섎㈃�� �쒕쾲�� "of"�� �먮윭硫붿떆吏���..
    for (var pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1])
    }

    $.ajax({
      type: 'POST',
      enctype: 'multipart/form-data', // �꾩닔
      url: '/saeraon/ask/insertAsk.do',
      data: formData, // �꾩닔
      processData: false, // �꾩닔
      contentType: false, // �꾩닔
      cache: false,
      success: function (result) {
        // alert("�뺤긽�곸쑝濡� �꾩넚�섏뿀�듬땲��.");
        alert(lang.success)
        $('#content').val('')
      },
      error: function (e) {
        // alert("�깅줉�� �ㅽ뙣�섏��듬땲��. 愿�由ъ옄�먭쾶 臾몄쓽�섏꽭��.");
        alert(lang.fail)
      },
    })
  })

  $('.agree-more-btn').click(function () {
    $('.agree-content-wrap').css('display', 'block')
    $('body').css('overflow-y', 'hidden')
  })
  $('.agree-close-btn').click(function () {
    $('.agree-content-wrap').css('display', 'none')
    $('body').css('overflow-y', 'auto')
  })
})
