function DistrictDetail(district) {
	return (
		<div className="flex flex-col items-center">
			<h1>{district?.name}</h1>
			<img src={district?.picture} alt="district" />
			<p>{district?.description}</p>
		</div>
	);
}

export default DistrictDetail;
