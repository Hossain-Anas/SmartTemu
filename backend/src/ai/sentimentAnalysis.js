const Groq = require('groq-sdk');

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

const analyzeReviewSentiment = async (reviewText) => {
  try {
    if (!process.env.GROQ_API_KEY) {
      throw new Error('GROQ_API_KEY is not configured');
    }

    if (!reviewText || typeof reviewText !== 'string' || reviewText.trim().length === 0) {
      throw new Error('Review text is required');
    }

    const systemPrompt = `You are a sentiment analysis expert for product reviews. Analyze the following product review and determine its sentiment.

Review Text: "${reviewText}"

Respond with a JSON object in this exact format:
{
  "sentiment": "positive" or "negative" or "neutral",
  "sentimentScore": a number between 0 and 1 (where 0 = very negative, 0.5 = neutral, 1 = very positive),
  "confidence": a number between 0 and 1 indicating how confident you are in the analysis
}

Guidelines:
- "positive" if the review expresses satisfaction, praise, or positive experience
- "negative" if the review expresses dissatisfaction, complaints, or negative experience
- "neutral" if the review is factual without clear positive or negative emotion
- sentimentScore should be precise: 0.0-0.3 (negative), 0.4-0.6 (neutral), 0.7-1.0 (positive)
- Only return valid JSON, no additional text`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: systemPrompt }],
      model: 'llama-3.1-8b-instant',
      temperature: 0.3,
      max_tokens: 200,
      response_format: { type: 'json_object' }
    });

    const responseText = completion.choices[0]?.message?.content || '{}';
    const result = JSON.parse(responseText);

    if (!result.sentiment || !result.sentimentScore) {
      throw new Error('Invalid response from AI service');
    }

    const sentiment = result.sentiment.toLowerCase();
    if (!['positive', 'negative', 'neutral'].includes(sentiment)) {
      throw new Error('Invalid sentiment classification');
    }

    const sentimentScore = Math.max(0, Math.min(1, parseFloat(result.sentimentScore) || 0.5));

    return {
      sentiment,
      sentimentScore,
      confidence: Math.max(0, Math.min(1, parseFloat(result.confidence) || 0.8))
    };

  } catch (error) {
    console.error('Error analyzing review sentiment:', error);
    
    if (error.message.includes('JSON')) {
      return {
        sentiment: 'neutral',
        sentimentScore: 0.5,
        confidence: 0.5
      };
    }
    
    throw error;
  }
};

const generateSentimentSummary = async (reviews) => {
  try {
    if (!process.env.GROQ_API_KEY) {
      throw new Error('GROQ_API_KEY is not configured');
    }

    if (!reviews || !Array.isArray(reviews) || reviews.length === 0) {
      return 'No reviews available for sentiment analysis.';
    }

    const reviewTexts = reviews
      .filter(r => r.comment && r.comment.trim().length > 0)
      .map(r => r.comment)
      .slice(0, 20);

    if (reviewTexts.length === 0) {
      return 'No review comments available for analysis.';
    }

    const reviewsContext = reviewTexts
      .map((text, idx) => `Review ${idx + 1}: "${text}"`)
      .join('\n\n');

    const positiveCount = reviews.filter(r => r.sentiment === 'positive').length;
    const negativeCount = reviews.filter(r => r.sentiment === 'negative').length;
    const neutralCount = reviews.filter(r => r.sentiment === 'neutral').length;
    const totalCount = reviews.length;

    const systemPrompt = `You are an AI assistant that analyzes product reviews and generates helpful summary insights.

REVIEWS TO ANALYZE:
${reviewsContext}

STATISTICS:
- Total Reviews: ${totalCount}
- Positive: ${positiveCount}
- Negative: ${negativeCount}
- Neutral: ${neutralCount}

Generate a concise, helpful summary (2-3 sentences) that highlights:
1. Overall customer sentiment (mostly positive/negative/mixed)
2. Key themes or common points mentioned (e.g., "Most users liked the comfort", "Common complaints about delivery time")
3. Any notable patterns or insights

Keep it natural, informative, and useful for potential customers. Do not include statistics numbers in the summary, just describe the sentiment and themes.`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: systemPrompt }],
      model: 'llama-3.1-8b-instant',
      temperature: 0.7,
      max_tokens: 300
    });

    const summary = completion.choices[0]?.message?.content?.trim() || 
      'Sentiment analysis summary is not available at this time.';

    return summary;

  } catch (error) {
    console.error('Error generating sentiment summary:', error);
    return 'Unable to generate sentiment summary. Please try again later.';
  }
};

module.exports = {
  analyzeReviewSentiment,
  generateSentimentSummary
};
