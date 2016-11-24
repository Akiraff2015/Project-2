$(function() {
  var itemObj;
  $('#item').on('click', function(e) {
    e.preventDefault();
    itemObj = {
      receiptName: $('#name').val() || "No Name",
      priceSpect: Number($('#total').val()).toFixed(2) || 0.00,
      paymentMethod: $('input[name="payment"]:checked').val(),
      dateCreated: new Date(),
      formatDate: moment(this.dateCreated).format('DD MMM YYYY')
    };

    // TODO ajax POST
    // $.ajax({
    //   method: 'POST',
    //   url: '/api/item',
    //   data: itemObj
    // }).done(function(data) {
    //   console.log(data);
    // });
  });
});