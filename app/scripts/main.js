var hashData;

function changePage(e)
{
  window.location.hash = '#'+ e;
}

function getHash()
{
  hashData = window.location.hash.substring(1);

	if (hashData!==''){
    changePage(hashData);
	}
}

$(window).on('hashchange', function()
{
  hashData = window.location.hash.substring(1);

	$('.page').hide();
	$('#p'+hashData).show();
});
