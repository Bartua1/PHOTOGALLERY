from silence.decorators import endpoint

@endpoint(
    route="/artists",
    method="GET",
    sql="SELECT * FROM Artists"
)
def get_all():
    pass