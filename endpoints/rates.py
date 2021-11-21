from silence.decorators import endpoint

@endpoint(
    route="/rates",
    method="GET",
    sql="SELECT * FROM Rates"
)
def get_all():
    pass

###############################################################################

@endpoint(
	route="/rates",
	method="POST",
	sql="INSERT INTO Rates (rate, userId, photoId) VALUES ($rate,$userId,$photoId)",
	auth_required=True
)

def create(rate, userId, photoId):
	pass

###############################################################################

@endpoint(
	route="/photos/$photoId/rates",
	method="DELETE",
	sql="DELETE FROM Rates WHERE photoId=$photoId",
	auth_required=True
)

def delete(photoId):
	pass
