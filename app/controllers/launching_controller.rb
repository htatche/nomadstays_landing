class LaunchingController < ApplicationController
	skip_before_filter  :verify_authenticity_token

  def en
  	@language = "ENGLISH"
  end

  def es
  	@language = "SPANISH"
  end

	def contact
		name = params[:name]
		email = params[:contactEmail]
		message = params[:message]

	  RestClient.post "https://api:key-ba42bb0914aedbf780a9481716e493f2"\
	  "@api.mailgun.net/v3/mail.nomadstays.co/messages",
	  :from => "Excited User <mailgun@mail.nomadstays.co>",
	  :to => "bar@example.com, herve.tatche@gmail.com",
	  :subject => "Hello",
	  :html => "<p><strong>#{name}</strong> (#{email}) wrote you this message: </p> <p> #{message}</p>"

	  head :ok
	end
    
end
