from silence.decorators import endpoint

@endpoint(
    route="/categories",
    method="GET",
    sql="SELECT * FROM Categories"
)
def get_all():
    pass

###############################################################################

@endpoint(
	route="/categories",
	method="POST",
	sql="INSERT INTO Categories (category) VALUES ($category)",
	auth_required=True
)

def create(category):
	pass

###############################################################################

@endpoint(
	route="/categories/$category",
	method="GET",
	sql="SELECT * FROM Categories WHERE category=$category",
	auth_required=True
)

def get_by_id():
	pass