export async function onRequestPost(context) {
  try {
    const telegramBotToken = '5458783596:AAGrAKN5Su7ApVD6LeWKfQ6bosVk1V8bxZ4';
    const telegramChatId = '-860374952';

    let input = await context.request.formData();

    let output = {};
    for (let [key, value] of input) {
      let tmp = output[key];
      if (tmp === undefined) {
        output[key] = value;
      } else {
        output[key] = [].concat(tmp, value);
      }
    }

    let pretty = JSON.stringify(output, null, 2);

    const telegramApiUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;
    await fetch(telegramApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: telegramChatId,
        text: pretty,
      }),
    });

    // Возвращаем успешный ответ
    return new Response(pretty, {
      status: 302, // Статус 302 означает временный редирект
      headers: {
        'Location': './thanks.html?name="name"', // Замените на ваш целевой URL
        'Content-Type': 'application/json;charset=utf-8',
      },
    });
  } catch (error) {
    console.error('Ошибка обработки формы:', error);

    // Возвращаем ответ об ошибке
    return new Response('Error parsing JSON content', { status: 400 });
  }
}