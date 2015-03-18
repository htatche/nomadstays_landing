class LaunchingController < ApplicationController
	skip_before_filter  :verify_authenticity_token

  def index
  end

	def contact
		Rails.logger.debug params

		name = params[:name]
		email = params[:contactEmail]
		message = params[:message]

	  RestClient.post "https://api:key-ba42bb0914aedbf780a9481716e493f2"\
	  "@api.mailgun.net/v2/sandboxac41e804e8e94410b7756bd3a746b783.mailgun.org/messages",
	  :from => "Mailgun Sandbox <postmaster@sandboxac41e804e8e94410b7756bd3a746b783.mailgun.org>",
	  :to => "Herve <herve.tatche@gmail.com>",
	  :subject => "NomadStays Contact form",
	  :html => "<p><strong>#{name}</strong> (#{email}) wrote you this message: </p> <p> #{message}</p>"

	  head :ok
	end
    
end
