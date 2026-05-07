async function consultar(sql) {
    const url = "http://localhost:3000/daw/" + encodeURIComponent(sql);
    const resp = await fetch(url);
    const json = await resp.json();
    return json.data;
}

