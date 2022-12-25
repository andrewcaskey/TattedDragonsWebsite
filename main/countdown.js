// Set the date we're counting down to
                                    var countDownDate = new Date("Jan 31, 2022 3:00:00").getTime();
                                    
                                    // Update the count down every 1 second
                                    var x = setInterval(function() {
                                    
                                      // Get today's date and time
                                      var date = new Date();
                                      var now = (date.getTime() + (date.getTimezoneOffset() * 60000)) + (3600000*-6);
                                    
                                      // Find the distance between now and the count down date
                                      var distance = countDownDate - now;
                                    
                                      // Time calculations for days, hours, minutes and seconds
                                      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                                      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                                      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                                      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                                    
                                      // Display the result in the element with id="demo"
                                      document.getElementById("countdown").textContent = days + "d " + hours + "h "
                                      + minutes + "m " + seconds + "s ";
                                    
                                      // If the count down is finished, write some text
                                      if (distance <= 0) {
                                        clearInterval(x);
                                        document.getElementById("countdown-section").remove();
                                        document.getElementById("mint-section").style.display = "block";
                                        document.getElementById("countdown-button").href = "#mint-section";
                                        document.getElementById("countdown-button").textContent = "Mint";
                                      }
                                    }, 1000);