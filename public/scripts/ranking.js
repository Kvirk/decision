$(document).ready(function () {
  registerRankingElementChange();
  registerSubmitRanking();
  setOptionsContainerHeight();

  $(window).resize(setOptionsContainerHeight);
});

function setOptionsContainerHeight() {
  var container = $('.section-container.options');
  container.css('height', 'auto');
  container.css('height', (container.css('height')));
}

function registerRankingElementChange() {
  $("#ranked-options").sortable({
    update: onRankedElementsChanged
  });
}

function onRankedElementsChanged(event, ui) {
  var $children = $(this).children();
  $children.each(function (index) {
    $(this).find("span").text(String(index + 1));
  });
}

function registerSubmitRanking() {
  $("#submit-ranking").on('click', function (event) {
    console.log("pressed button");
    onSubmitRanking(event);
  });
}

function onSubmitRanking(event) {
  event.preventDefault();

  var $rankedOptions = $("#ranked-options");
  var $children = $rankedOptions.children();
  var totalCount = 0;
  var answers = [];
  $children.each(function (index) {
    totalCount++;
    var curRank = index + 1;
    var curID = Number($(this).attr("data-id"));
    answers.push({
      choice_id: curID
      // not needed for the database
      // points: curRank
    });
  });
  var bordaCount = totalCount;
  for (var i = 0; i < answers.length; i++) {
    answers[i]["points"] = bordaCount;
    bordaCount--;
  }
  console.log($(location).attr('href'));
  // $(".container").empty();


let id = $('.container .droptrue').attr('data-id');
  $.ajax({
    method: "POST",
    // url: $(location).attr('href')
    url: `/polls/${id}`,
    data: {
      answers
    },
    success: function (success) {
      event.preventDefault();
      $('.container').empty();
      $('.error-notice').slideUp(function () {
        $('.success-notice').slideDown();
      // $('<span class="emphasize" style="margin-bottom: 1em;">Thank you for taking the poll!</span>').replaceAll('#ranked-options').css('text-align', 'center');
      // $('#submit-ranking').remove();
      // $('.section-container.options header p.lead').remove();
      // $('.section-container.options header h3').text('Results Submitted');

      });
    },
    error: function (error) {
      event.preventDefault();
      console.log(error);
      $('.error-notice').slideUp(function () {
        $('.error-notice').slideDown();
      });
    }
  })

  // .done(function (msg) {
  // $('<span class="emphasize" style="margin-bottom: 1em;">Thank you for taking the poll!</span>').replaceAll('#ranked-options').css('text-align', 'center');
  // $('#submit-ranking').remove();
  // $('.section-container.options header p.lead').remove();
  // $('.section-container.options header h3').text('Results Submitted');
  // $('<button>')
  //   .addClass('btn btn-default')
  //   .text('Make a New Poll')
  //   .appendTo($('<a>').attr('href', '/').appendTo('.section-container.options'));
  // $('.section-container.options').css('text-align', 'center');
  // setOptionsContainerHeight();
  // })
  // .fail(function (err) {});
  ;
}