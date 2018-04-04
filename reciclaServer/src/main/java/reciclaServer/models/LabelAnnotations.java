package reciclaServer.models;

public class LabelAnnotations {

    private String description;

    private double score;

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getScore() {
        return score;
    }

    public void setScore(double score) {
        this.score = score;
    }

    @Override
    public String toString() {
        return "{description: '" + description + '\'' + ", score: " + score + '}';
    }
}
