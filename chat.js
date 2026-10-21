const MODEL = "gemini-2.5-flash";
export async function onRequestPost({ request, env }) {
  if (!env.GEMINI_API_KEY) return Response.json({error:"Setup incomplete: add GEMINI_API_KEY in Cloudflare Pages settings."},{status:500});
  let body; try { body=await request.json(); } catch { return Response.json({error:"Invalid request body."},{status:400}); }
  const contents=Array.isArray(body.contents)?body.contents:[];
  if(!contents.length) return Response.json({error:"Please type a message first."},{status:400});
  const safe=contents.slice(-16).map(x=>({role:x.role==="model"?"model":"user",parts:[{text:String(x.parts?.[0]?.text||"").slice(0,6000)}]}));
  try {
    const r=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-key":env.GEMINI_API_KEY},body:JSON.stringify({contents:safe,generationConfig:{temperature:0.7,maxOutputTokens:700}})});
    const data=await r.json();
    if(!r.ok) return Response.json({error:data?.error?.message||"AI provider request failed. Check API key and free quota."},{status:r.status===429?429:502});
    const reply=data?.candidates?.[0]?.content?.parts?.map(p=>p.text||"").join("").trim();
    if(!reply) return Response.json({error:"AI returned an empty response. Try again."},{status:502});
    return Response.json({reply});
  } catch { return Response.json({error:"Could not connect to AI service. Try later."},{status:502}); }
}
