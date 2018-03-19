define(()=>{
	const assets=[];
	const baseUrl='../assets/jinjiu_001_bg-';
	for(let i=10;i<80;i++){
		assets.push({
			src:`${baseUrl}(${i}).jpg`
		})
	}
	return assets;
})